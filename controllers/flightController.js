import Flight from "../models/Flight.js";
import { isItAdmin } from "./userController.js";

// Create Flight - Only Admin
export async function createFlight(req, res) {
  if (!isItAdmin(req)) return res.status(403).json({ error: "Only admins can create flights" });

  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get All Flights - Public
export async function getAllFlights(req, res) {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Flight by ID - Public
export async function getFlightById(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update Flight - Only Admin
export async function updateFlight(req, res) {
  if (!isItAdmin(req)) return res.status(403).json({ error: "Only admins can update flights" });

  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete Flight - Only Admin
export async function deleteFlight(req, res) {
  if (!isItAdmin(req)) return res.status(403).json({ error: "Only admins can delete flights" });

  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
