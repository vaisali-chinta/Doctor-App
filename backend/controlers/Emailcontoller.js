const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bokammanikanta1@gmail.com",
    pass: "ycoz cinu zafh axga" // Be cautious with hardcoding sensitive information like passwords in your code
  }
});

const sendEmail = async (req, res) => {
  const {
    u_student_name,
    u_student_roll_no,
    u_college,
    u_branch,
    u_student_mail_id,
    u_year_of_study,
    u_date_of_issue,
    u_current_course,
    u_state,
    u_comments
  } = req.body;

  const mailOptions = {
    from: "bokammanikanta1@gmail.com", // Sender's email address
    to: "gopalkrishnakoppisetti@gmail.com", // Recipient's email address
    subject: "New Attendance Issue Submission",
    text: `
    Attendance Issue Details:

    Student Name: ${u_student_name}
    Roll Number: ${u_student_roll_no}
    College: ${u_college}
    Branch: ${u_branch}
    Year of Study: ${u_year_of_study}
    Date of Issue: ${u_date_of_issue}
    Current Course: ${u_current_course}
    State: ${u_state}
    Comments: ${u_comments}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

module.exports = { sendEmail };
