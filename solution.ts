function formatValue(value: number | string | boolean) : number | string | boolean {
    if (typeof value === 'number') {
        return value * 10;
    }
    else if (typeof value === 'string') {
        return value.toUpperCase();
    }
    else{
        return !value;
    }
}


function getLength(value: string | Array<any>): number {
    if (typeof value === 'string') {
        return value.length;
    }
    if (Array.isArray(value)) {
        return value.length;
    }
    throw new Error('Unsupported type');
}


class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return `'Name: ${this.name}, Age:${this.age}'`;
    }
}


function filterByRating(items: Array<{ title: string; rating: number }>): Array<{ title: string; rating: number }> {
    const newItems = items.filter(item => item.rating >= 4);
    return newItems;
}


function filterActiveUsers(user:Array<{id: number, name: string, email: string, isActive: boolean}>) :Array<object> {
    const activeUsers = user.filter((u: any) => u.isActive);
    return activeUsers;
}


interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}
function printBookDetails(books: Book) :void {
    const avail=books.isAvailable ? 'Yes' : 'No';
    console.log(`Title: ${books.title}, Author: ${books.author}, Published Year: ${books.publishedYear}, Available: ${avail}`);
    
}


function getUniqueValues<T>(array1:Array<T>,array2:Array<T>): Array<T> {
    const resultantArray: Array<T> = [];
    function addUnique(value: T) {
        let found = false;
        for (let i = 0; i < resultantArray.length; i++) {
            if (resultantArray[i] === value) {
                found = true;
                break;
            }
        }
        if (!found) {
            resultantArray.push(value);
        }
    }
    for (const item of array1) {
        addUnique(item);
    }
    for (const item of array2) {
        addUnique(item);
    }
    return resultantArray;
}


function calculateTotalPrice(products: Array<{name: string; price: number; quantity: number, discount?: number}>): number {

    const total = products.reduce((sum, p) => {
    const discount = p.discount ?? 0;
    const priceAfterDiscount = p.price - (p.price * discount) / 100;
    return sum + priceAfterDiscount * p.quantity;
     }, 0);
    return total;
}
