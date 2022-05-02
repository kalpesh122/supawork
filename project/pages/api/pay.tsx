import type { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { supabase } from "../../libs/supabase";

const baseUrl = process.env.BASE_URL!;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

async function Pay(req: NextApiRequest, res: NextApiResponse) {
  const { data: activeWorkoutPlan } = await supabase
    .from("active_workout_plans")
    .select("*")
    .eq("id", req.body.id)
    .single();
  const { data: workoutPlan } = await supabase
    .from("workout_plans")
    .select("*")
    .eq("id", activeWorkoutPlan.workout_plan_id)
    .single();

  console.log("starting", activeWorkoutPlan.payment_type);

  if (activeWorkoutPlan.payment_type === "subscription") {
    console.log("subscription");

    const price = await stripe.prices.create({
      currency: "GBP",
      unit_amount: activeWorkoutPlan.price * 100,
      product_data: {
        name: `${workoutPlan.name}-${Math.random()}`,
      },
      recurring: { interval: "month" },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      client_reference_id: req.body.id,
      mode: activeWorkoutPlan.payment_type,
      success_url: `${baseUrl}/workoutplan`,
      cancel_url: `${baseUrl}/workoutplan`,
    });

    res.redirect(303, session.url!);
    return;
  }

  console.log("one time");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        amount: activeWorkoutPlan.price * 100,
        currency: "gbp",
        quantity: 1,
        name: workoutPlan.name,
      },
    ],
    client_reference_id: req.body.id,
    mode: activeWorkoutPlan.payment_type,
    success_url: `${baseUrl}/workoutplan`,
    cancel_url: `${baseUrl}/workoutplan`,
  });

  res.redirect(303, session.url!);
}

export default Pay;
