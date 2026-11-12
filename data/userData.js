export function getUserData(){
    return {
        name: 'ayam',
        email: `ayam${Date.now()}-${Math.random()}@gmail.com`,
        incorrectEmail : `itik${Date.now()}-${Math.random()}@gmail.com`,
        password: 'ayamgoreng001',
        incorrectPassword: 'itikgoreng001',
        birthDate: { day: '30', month: '1', year: '1996' },
        newsletter: true,
        offers: true,
        firstName: 'Ayam',
        lastName: 'Goreng',
        company: 'Chicken',
        address1: 'Coop, Road 234',
        address2: 'Ciken Street',
        country: 'United States',
        state: 'New York',
        city: 'New York',
        zipcode: '10001',
        mobileNumber: '+1234567890',
        description: 'This is a test order description.'
    };
}
    
