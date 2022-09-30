<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->company,
            'country' => $this->faker->country,
            'city' => $this->faker->city,
            'address' => $this->faker->address,
            'zipCode' => $this->faker->numberBetween(100000, 999999),
            'usersNumber'=> 1,
            'beaconsNumber' => $this->faker->numberBetween(1, 15),
            'status' => $this->faker->randomElement(['served', 'not served'])
        ];
    }
}
