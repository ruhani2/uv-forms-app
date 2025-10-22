import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        gender,
        maritalStatus,
        prefix,
        firstName,
        middleName,
        lastName,
        uid,
        biometric,
        dateOfRegistrationAsJigyasu,
        caste,
        healthStatus,
        phone: { code, number },
        email,
        involvedInPolitics,
        preliminaryBooks,
        dateOfBirth: { date, years, months },
        appliedEarlier,
        letterNo,
        replyGivenBySabha,
        dateOfLetter,
        alreadyInitiated: {
          acknowledged,
          initiatedAt,
          initiatedBy,
          placeOfInitiation,
          reasonToRelinquish,
        },
      } = req.body;

      const firstBhandara = await prisma.bhandara.findFirst();

      if (!firstBhandara) {
        return res
          .status(400)
          .json({ error: "Please provide valid bhandara." });
      }

      // For now, using dummy IDs for relations that are not yet handled by the form
      // You will need to replace these with actual IDs from your form data or logic
      const dummyCreatedByUserId = 1; // Replace with actual createdByUserId from session or logic
      const dummyUpdatedByUserId = 1; // Replace with actual updatedByUserId from session or logic

      const newApplication = await prisma.application.create({
        data: {
          title: prefix,
          firstName,
          middleName,
          applicationStatus: "draft",
          lastName,
          caste,
          uid,
          gender,
          maritalStatus,
          healthStatus,
          dateOfBirth: date ? new Date(date) : null,
          ageYears: years,
          ageMonths: months,
          connectedToPolitics: involvedInPolitics,
          email: { emailAddress: email },
          phoneNumber: { code, number },
          alreadyInitiated: {
            acknowledged,
            initiatedAt: initiatedAt ? new Date(initiatedAt) : null,
            initiatedBy,
            placeOfInitiation,
            reasonToRelinquish,
          },
          appliedEarlier: {
            acknowledged: appliedEarlier === "Yes",
            letterNo,
            replyGivenBySabha,
            dateOfLetter: dateOfLetter ? new Date(dateOfLetter) : null,
          },
          booksRead: JSON.stringify(preliminaryBooks),
          jigyasuRegistrationDate: dateOfRegistrationAsJigyasu
            ? new Date(dateOfRegistrationAsJigyasu)
            : null,
          isBiometricAvailable: biometric,
          bhandaraId: firstBhandara.id,
          createdByUserId: dummyCreatedByUserId,
          updatedByUserId: dummyUpdatedByUserId,
        },
      });

      res.status(200).json({
        message: "First Updesh Registration successful",
        id: newApplication.id,
      });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({
        error: "An error occurred while processing the registration",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
