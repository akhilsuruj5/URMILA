const mongoose = require("mongoose");
const Offering = require("./models/Offerings"); 

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vinaymalik1729:2QVRcNSMZAqAvS4s@cluster0.boree.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const updatedCourse = await Offering.findByIdAndUpdate(
      "673e295487478671082558d6",
      {
        tableOfContent: [
          "Warehouse operations",
          "Warehouse solutions",
          "Transport operations and solutions",
          "Freight forwarding",
          "Project management",
          "Account management",
          "Performance management",
          "Case studies",
          "Capstone project and onsite learnings",
        ],       
      },
      { new: true }
    );

    console.log("Updated Course:", updatedCourse);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error updating course:", error);
  }
})();
