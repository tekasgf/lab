const mongoose = require('mongoose');
const Student = require('./models/Student');

//connection
mongoose.connect('mongodb://localhost:27017/labwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));

//CRUD operations
async function runCRUDOperations() {
    try {
        //insert
        const students = [
            { name: 'Alice', age: 20, major: 'Physics', enrolled: true },
            { name: 'Bob', age: 22, major: 'Mathematics', enrolled: false },
            { name: 'Charlie', age: 23, major: 'Computer Science', enrolled: true },
        ];
        await Student.insertMany(students);
        console.log('Students inserted');

        //query and logs
        const allStudents = await Student.find();
        console.log('All Students:', allStudents);

        //update
        const updatedStudent = await Student.findOneAndUpdate(
            { name: 'Alice' },
            { major: 'Biology', age: 21 },
            { new: true }
        );
        console.log('Updated Student:', updatedStudent);

        //delete
        await Student.deleteOne({ name: 'Bob' });
        console.log('Deleted Student with name "Bob"');

        //remaining students
        const remainingStudents = await Student.find();
        console.log('Remaining Students:', remainingStudents);
    } catch (err) {
        console.error('Error during CRUD operations:', err);
    }
}

runCRUDOperations();
