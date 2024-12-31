const mongoose = require("mongoose");
const Reason = require("./models/reason");
require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    
    await Reason.deleteMany({});

    const reasons = [
      {
        reason: "Fever",
        contentTemplate: "I am [Your Name] from [Your Class]. I am unable to attend school on [Date] due to a fever. I will rest and recover soon. Thank you for your understanding."
      },
      {
        reason: "Stomach Ache",
        contentTemplate: "I am [Your Name] from [Your Class]. I am feeling unwell due to a stomach ache and will not be able to attend school on [Date]. I appreciate your support."
      },
      {
        reason: "Cold and Cough",
        contentTemplate: "I am [Your Name] from [Your Class]. I have a cold and cough, which makes attending school on [Date] difficult. I will rest and recover quickly. Thank you for understanding."
      },
      {
        reason: "Headache",
        contentTemplate: "I am [Your Name] from [Your Class]. I am experiencing a headache, which prevents me from attending school on [Date]. I apologize for any inconvenience caused."
      },
      {
        reason: "Flu",
        contentTemplate: "I am [Your Name] from [Your Class]. I am unwell due to the flu and will not be able to attend school on [Date]. I will ensure to catch up on missed work."
      },
      {
        reason: "Family Emergency",
        contentTemplate: "I am [Your Name] from [Your Class]. A family emergency has arisen, and I am unable to attend school on [Date]. Thank you for your understanding."
      },
      {
        reason: "Personal Work",
        contentTemplate: "I am [Your Name] from [Your Class]. I need to attend to personal work on [Date] and will be unable to come to school. I will make up for any missed responsibilities."
      },
      {
        reason: "Medical Appointment",
        contentTemplate: "I am [Your Name] from [Your Class]. I have a medical appointment on [Date] and cannot attend school. I will ensure to catch up on all missed lessons."
      },
      {
        reason: "Mental Health Day",
        contentTemplate: "I am [Your Name] from [Your Class]. I need to take a mental health day on [Date] to focus on self-care. I will ensure to complete all missed work promptly."
      },
      {
        reason: "Bereavement",
        contentTemplate: "I am [Your Name] from [Your Class]. I regret to inform you of a bereavement in my family. I will be unable to attend school on [Date]. Thank you for your kind understanding."
      },
      {
        reason: "Religious Observance",
        contentTemplate: "I am [Your Name] from [Your Class]. I will be observing a religious event on [Date] and will not be able to attend school. I will stay updated on lessons."
      },
      {
        reason: "Transportation Issues",
        contentTemplate: "I am [Your Name] from [Your Class]. I am facing transportation issues and cannot attend school on [Date]. I will make up for any missed lessons promptly."
      },
      {
        reason: "Severe Weather",
        contentTemplate: "I am [Your Name] from [Your Class]. Severe weather conditions prevent me from attending school on [Date]. I will stay updated with lessons remotely."
      },
      {
        reason: "School Event Participation",
        contentTemplate: "I am [Your Name] from [Your Class]. I am representing the school in an event on [Date], which will make me unavailable for classes. I will ensure to complete missed assignments."
      },
      {
        reason: "Jury Duty",
        contentTemplate: "I am [Your Name] from [Your Class]. I have been called for jury duty on [Date], which requires my full attention. I will catch up on all lessons promptly."
      },
      {
        reason: "Volunteer Work",
        contentTemplate: "I am [Your Name] from [Your Class]. I will be involved in volunteer work on [Date] and unable to attend school. I will ensure to complete all missed responsibilities."
      },
      {
        reason: "College Visit",
        contentTemplate: "I am [Your Name] from [Your Class]. I will be visiting a college on [Date] as part of my future planning. I will make up for any missed lessons."
      },
      {
        reason: "Technical Difficulties",
        contentTemplate: "I am [Your Name] from [Your Class]. I am experiencing technical issues today, [Date], which prevent me from attending. I will resolve them and catch up on missed work."
      },
      {
        reason: "Family Function",
        contentTemplate: "I am [Your Name] from [Your Class]. I need to attend a family function on [Date] and will not be able to come to school. Thank you for your kind understanding."
      },
      {
        reason: "Sports Tournament",
        contentTemplate: "I am [Your Name] from [Your Class]. I am participating in a sports tournament on [Date] and will be unable to attend school. I will ensure to catch up on all missed lessons."
      },
      {
        reason: "Competition Preparation",
        contentTemplate: "I am [Your Name] from [Your Class]. I am preparing for an upcoming competition and need to take leave on [Date]. I will ensure to complete any missed lessons."
      },
      {
        reason: "Examination Preparation",
        contentTemplate: "I am [Your Name] from [Your Class]. I need time on [Date] to prepare for an important examination. I will catch up on lessons promptly. Thank you for understanding."
      },
      {
        reason: "Parent-Teacher Conference",
        contentTemplate: "I am [Your Name] from [Your Class]. I will be accompanying my parents for a meeting on [Date] and will not attend school. I appreciate your understanding."
      },
      {
        reason: "Sibling’s Graduation",
        contentTemplate: "I am [Your Name] from [Your Class]. I need to attend my sibling’s graduation ceremony on [Date]. I will ensure to stay updated on lessons."
      },
      {
        reason: "Festival Celebration",
        contentTemplate: "I am [Your Name] from [Your Class]. I will be celebrating an important festival with my family on [Date]. I will make up for any missed responsibilities."
      },
      {
        reason: "Car Breakdown",
        contentTemplate: "I am [Your Name] from [Your Class]. I am unable to attend school on [Date] due to a car breakdown. I apologize for the inconvenience and will catch up on lessons."
      },
      {
        reason: "Emergency Repairs at Home",
        contentTemplate: "I am [Your Name] from [Your Class]. I need to stay home on [Date] due to emergency repairs at home. I will ensure to complete missed assignments."
      },
      {
        reason: "Sibling’s Medical Appointment",
        contentTemplate: "I am [Your Name] from [Your Class]. I will be accompanying my sibling for a medical appointment on [Date]. I will ensure to catch up on all missed work."
      },
      {
        reason: "Teacher’s Approval for Leave",
        contentTemplate: "I am [Your Name] from [Your Class]. I have received approval from my teacher to take leave on [Date] for personal reasons. Thank you for your understanding."
      }
    ];

    for (let reason of reasons) {
      await Reason.updateOne(
        { reason: reason.reason },
        { $setOnInsert: reason },
        { upsert: true }
      );
    }
    console.log("Reasons seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });