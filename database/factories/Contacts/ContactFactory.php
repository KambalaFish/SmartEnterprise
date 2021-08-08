<?php


namespace Database\Factories\Contacts;

use \Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{

    /**
     * @inheritDoc
     */
    public function definition()
    {
        return [
            'firstName' => $this->faker->firstName,
            'lastName' => $this->faker->lastName,
            'email' => $this->faker->email,
            'phoneNumber' => $this->faker->phoneNumber
        ];
    }
}
