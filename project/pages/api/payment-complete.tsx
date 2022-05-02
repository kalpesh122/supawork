import type { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { buffer } from "micro";
import { supabase } from "../../libs/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const endpointSecret = "whsec_AVWbZKoZbiCz19BuoGPiEWTDSLbT5dcS";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function PaymentComplete(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      await supabase
        .from("active_workout_plans")
        .update({ paid: true })
        .eq("id", session.client_reference_id);
    } else if (event.type === "invoice.payment_failed") {
      const session = event.data.object;

      await supabase
        .from("active_workout_plans")
        .update({ paid: false })
        .eq("id", session.client_reference_id);
    }

    res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default PaymentComplete;
