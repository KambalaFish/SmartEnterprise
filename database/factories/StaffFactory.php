<?php

namespace Database\Factories;

use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class StaffFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Staff::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $email = $this->faker->email;
        return [
            'name' => $this->faker->lastName,
            'phoneNumber' => $this->faker->phoneNumber,
            'email' => $email,
            'status' => $this->faker->randomElement(['works', 'on_vacation', 'illness']),
            'login' => $email,
//            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'password' => Hash::make('password'),
            'usertype' => $this->faker->randomElement(['systemAdmin', 'companyAdmin', 'manager']),
        ];
    }
}
