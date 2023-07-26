import express from "express";
import toNewPatient from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNoSsnPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(String(req.params.id)));
});

export default router;
