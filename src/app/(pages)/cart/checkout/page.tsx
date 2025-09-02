"use client"
import { Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";

export default function Order() {
  const {register,handleSubmit}= useForm()
  async function sendData(){

  }
  return (
    <form onSubmit={handleSubmit(sendData)}
     
      className="flex flex-col mx-auto md:w-[75%] m-11 gap-6 bg-white  rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-center">Order Details</h2>

      <Input
        isRequired
        name="name"
        label="Name"
        placeholder="Enter your name"
        className="rounded-2xl"
      />

      <Input
        isRequired
        type="tel"
        name="phone"
        label="Phone"
        placeholder="Enter your phone"
        className="rounded-2xl"
      />

      <Input
        isRequired
        name="city"
        label="City"
        placeholder="Enter your city"
        className="rounded-2xl"
      />

      <Button type="submit" color="primary" variant="bordered"  className="mt-2 rounded-2xl hover:bg-black hover:text-white">
        Pay Now
      </Button>
    </form>
  );
}
