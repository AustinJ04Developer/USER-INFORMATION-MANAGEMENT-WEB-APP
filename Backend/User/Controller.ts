import { Request, Response } from 'express';
import { AppDataSource } from '../Database/data-source';
import { User } from './Entity';
import { asyncHandler } from '../Utilities/asyncHandler';

// ✅ GET /api/users  → Get all users
export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find();
  res.status(200).json(users);
});

// ✅ GET /api/users/:id  → Get one user by unique ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await AppDataSource.getRepository(User).findOneBy({ id: Number(id) });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// ✅ POST /api/users  → Create a new user
export const addUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, dateOfBirth, email, address, phone, status } = req.body;

  if (!name || !dateOfBirth || !email || !address || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const userRepo = AppDataSource.getRepository(User);
  const existingUser = await userRepo.findOneBy({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const user = userRepo.create({
    name,
    dateOfBirth: new Date(dateOfBirth),
    email,
    address,
    phone,
    status: status ?? "Active", // Default to Active if not provided
  });
  await userRepo.save(user);

  res.status(201).json(user);
});

// ✅ PATCH /api/users/:id  → Update user by unique ID
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, dateOfBirth, email, address, phone, status } = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: Number(id) });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth);
  if (email) user.email = email;
  if (address) user.address = address;
  if (phone) user.phone = phone;
  if (status) user.status = status;

  await userRepo.save(user);
  res.status(200).json({ message: "User updated successfully", user });
});

// ✅ DELETE /api/users/:id  → Delete user by unique ID
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: Number(id) });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await userRepo.remove(user);
  res.status(204).send(); 
});
