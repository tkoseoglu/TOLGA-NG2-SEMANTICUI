export class User {
    firstName: string;
    lastName: string;
    dob: Date;

    constructor(firstName: string, lastName: string, dob: Date){
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
    }
}