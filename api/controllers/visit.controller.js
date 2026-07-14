import Visit from '../models/visit.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import { sendEmail } from '../utils/sendEmail.js';

/* ===========================================================
   Create Visit Request
=========================================================== */
export const createVisit = async (req, res, next) => {
  try {
    const { date, time, message } = req.body;

    if (!date || !time) {
      return next(errorHandler(400, 'Date and Time are required.'));
    }

    const listing = await Listing.findById(req.params.listingId).populate(
      'userRef',
      'username email'
    );
    console.log("listing.userRef:", listing.userRef);
console.log("req.user:", req.user);

    if (!listing) {
      return next(errorHandler(404, 'Listing not found.'));
    }

    // Prevent owner from booking own property
    if (listing.userRef._id.toString() === req.user.id) {
      return next(
        errorHandler(400, 'You cannot schedule a visit for your own property.')
      );
    }

   let visit;

try {
  visit = await Visit.create({
    listingId: listing._id,
    ownerId: listing.userRef._id,
    visitorId: req.user.id,
    date,
    time,
    message,
  });

  console.log("✅ Visit saved:", visit);
} catch (err) {
  console.error("❌ Visit.create() failed:", err);
  throw err;
}
    // Notify Owner (Email failure won't affect DB)
    try {
      const subject = '📅 New Property Visit Request - GharBasao';

      const html = `
        <div style="font-family:Arial,sans-serif">
          <h2>Hello ${listing.userRef.username},</h2>

          <p>You have received a new visit request for your property.</p>

          <hr>

          <p><strong>Property:</strong> ${listing.name}</p>
          <p><strong>Visitor:</strong> ${req.user.username}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>

          ${
            message
              ? `<p><strong>Message:</strong> ${message}</p>`
              : ''
          }

          <hr>

          <p>Please login to <strong>GharBasao</strong> to Accept or Reject this request.</p>

          <br>

          <p>Regards,<br><strong>Team GharBasao</strong></p>
        </div>
      `;

sendEmail(listing.userRef.email, subject, html)
  .then(() => console.log("✅ Owner email sent"))
  .catch((err) =>
    console.error("Owner notification email failed:", err.message)
  );    } catch (emailError) {
      console.error(
        'Owner notification email failed:',
        emailError.message
      );
    }

    res.status(201).json({
      success: true,
      message: 'Visit request submitted successfully.',
      visit,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   Get Owner Visit Requests
=========================================================== */
export const getOwnerVisits = async (req, res, next) => {
  try {
    console.log("================================");
    console.log("Logged in owner:", req.user.id);

    const visits = await Visit.find({
      ownerId: req.user.id,
    })
      .populate('listingId', 'name imageUrls')
      .populate('visitorId', 'username email avatar')
      .sort({ createdAt: -1 });

    console.log("Visits found:", visits.length);
    console.log(visits);
    console.log("================================");

    res.status(200).json(visits);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/* ===========================================================
   Accept / Reject Visit Request
=========================================================== */
export const updateVisitStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Accepted', 'Rejected'].includes(status)) {
      return next(errorHandler(400, 'Invalid visit status.'));
    }

    const visit = await Visit.findById(req.params.visitId)
      .populate('visitorId', 'username email')
      .populate('listingId', 'name');

    if (!visit) {
      return next(errorHandler(404, 'Visit request not found.'));
    }

    if (visit.ownerId.toString() !== req.user.id) {
      return next(errorHandler(403, 'Unauthorized.'));
    }

    visit.status = status;

    await visit.save();

    let subject = '';
    let html = '';

    if (status === 'Accepted') {
      subject = '✅ Visit Request Accepted - GharBasao';

      html = `
        <div style="font-family:Arial,sans-serif">

          <h2>Hello ${visit.visitorId.username},</h2>

          <p>Great news! 🎉</p>

          <p>Your visit request for
          <strong>${visit.listingId.name}</strong>
          has been
          <span style="color:green;"><strong>ACCEPTED</strong></span>.</p>

          <hr>

          <p><strong>Date:</strong> ${visit.date}</p>
          <p><strong>Time:</strong> ${visit.time}</p>

          <hr>

          <p>Please arrive on time and coordinate with the property owner if needed.</p>

          <br>

          <p>Thank you for choosing <strong>GharBasao</strong>.</p>

        </div>
      `;
    }

    if (status === 'Rejected') {
      subject = '❌ Visit Request Update - GharBasao';

      html = `
        <div style="font-family:Arial,sans-serif">

          <h2>Hello ${visit.visitorId.username},</h2>

          <p>Your visit request for
          <strong>${visit.listingId.name}</strong>
          has been
          <span style="color:red;"><strong>REJECTED</strong></span>.</p>

          <p>Don't worry! Many more properties are waiting for you on GharBasao.</p>

          <br>

          <p>Thank you for using <strong>GharBasao</strong>.</p>

        </div>
      `;
    }

    // Email shouldn't affect DB update
    try {
      await sendEmail(
        visit.visitorId.email,
        subject,
        html
      );

      console.log(
        `Visit status email sent to ${visit.visitorId.email}`
      );
    } catch (emailError) {
      console.error(
        'Visitor email failed:',
        emailError.message
      );
    }

    res.status(200).json({
      success: true,
      message: `Visit request ${status.toLowerCase()} successfully.`,
      visit,
    });
  } catch (error) {
    next(error);
  }
};