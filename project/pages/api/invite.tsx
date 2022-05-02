import type { NextApiRequest, NextApiResponse } from "next";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function Invite(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({ error: "Wrong params" });
    return;
  }

  const msg = {
    to: email,
    from: "hello@rosejunetaylor.com",
    subject: "You have been invited to join Rose June Taylor Fitness.",
    text: `You have been invited to join Rose June Taylor Fitness.\n\nYour login information is:\n\n  Email: ${email}\n\n  Password: ${password}\n\nClick the following link to login for online coaching: ${process.env.EMAIL_REDIRECT_URL}/login`,
  };

  res.status(200).json({ success: true });

  try {
    await sgMail.send(msg);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export default Invite;
