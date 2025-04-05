import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Invoice Marshal",
    };

    const recipients = [
      {
        email: "prayagkant1611@gmail.com",
      },
    ];

    emailClient.send({
      from: sender,
      to: recipients,
      template_uuid: "124221f2-3308-45ad-aa50-001fafa8a834",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Invoice Marshal",
        company_info_address: "Unit-7",
        company_info_city: "Bhubaneswar",
        company_info_zip_code: "752114",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
