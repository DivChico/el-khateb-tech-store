import prisma from "@/lib/prisma";
import { sanityClient } from "@/sanity/lib/order";

export async function POST(req) {
  console.log("post order");

  try {
    const { cartId } = await req.json();
    if (!cartId) {
      return new Response(JSON.stringify({ error: "Cart ID is required" }), {
        status: 400,
      });
    }

    // Fetch the cart with items
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });

    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
      });
    }

    // Create order in Sanity
    const order = await sanityClient.create({
      _type: "order",
      orderNumber: cartId.toString(),
      orderDate: new Date().toISOString(),
      customerId: " user?.id " || null,
      customerEmail: "user?.email" || null,
      customerName: " user?.email" || null,
      stripeCustomerId: "user?.stripeCustomerId" || null,
      stripeCheckoutSessionId: "user?.stripeCheckoutSessionId" || null,
      stripePaymentIntentId: "user?.id" || null,
      totalPrice: cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      shippingAddress: {
        _type: "shippingAddress",
        name: "session?.shipping_details?.name" || null,
        line1: "session?.shipping_details?.address?.line1" || null,
        line2: "session?.shipping_details?.address?.line2" || null,
        city: "session?.shipping_details?.address?.city" || null,
        state: "session?.shipping_details?.address?.state" || null,
        postalCode: "session?.shipping_details?.address?.postal_code" || null,
        country: "session?.shipping_details?.address?.country" || null,
      },
      orderItems: cart.items.map((item) => ({
        _type: "orderItem",
        _key: item.id,
        product: { _type: "reference", _ref: item.sanityProductId },
        quantity: item.quantity,
        price: item.price,
      })),
      status: "PROCESSING",
    });
    // Delete the cart
    const delCart = await

    return new Response(JSON.stringify({ success: true, order }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create order dont know" }),
      {
        status: 500,
      }
    );
  }
}
