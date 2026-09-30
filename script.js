// Student Data
let students = [];

// Course Data
let courses = [];

// Help Desk Queue
let helpQueue = [];

// Action History - Stack
let actionHistory = [];

// Show Section
function showSection(sectionId) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}


// Add Student
function addStudent() {

    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let branch = document.getElementById("branch").value;
    let semester = document.getElementById("semester").value;
    let cgpa = document.getElementById("cgpa").value;

    if (id === "" || name === "" || branch === "" ||
        semester === "" || cgpa === "") {

        alert("Please enter all student details.");
        return;
    }

    let student = {
        id: Number(id),
        name: name,
        branch: branch,
        semester: Number(semester),
        cgpa: Number(cgpa)
    };

    students.push(student);

    actionHistory.push("Added Student: " + name);

    displayStudents();
    updateDashboard();
    displayHistory();

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("semester").value = "";
    document.getElementById("cgpa").value = "";

    alert("Student added successfully!");
}


// Display Students
function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(function(student) {

        let row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>${student.semester}</td>
                <td>${student.cgpa}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}


// Add Course
function addCourse() {

    let studentId =
        document.getElementById("courseStudentId").value;

    let courseName =
        document.getElementById("courseName").value;

    if (studentId === "" || courseName === "") {
        alert("Please enter Student ID and Course Name.");
        return;
    }

    let course = {
        studentId: Number(studentId),
        name: courseName
    };

    courses.push(course);

    actionHistory.push(
        "Added Course: " + courseName
    );

    displayCourses();
    updateDashboard();
    displayHistory();

    document.getElementById("courseStudentId").value = "";
    document.getElementById("courseName").value = "";

    alert("Course added successfully!");
}


// Display Courses
function displayCourses() {

    let list = document.getElementById("courseList");

    list.innerHTML = "";

    courses.forEach(function(course) {

        let item = document.createElement("p");

        item.innerHTML =
            "Student ID: " + course.studentId +
            " → " + course.name;

        list.appendChild(item);
    });
}


// Add Student to Help Desk Queue
function addToQueue() {

    let studentId =
        document.getElementById("queueStudentId").value;

    if (studentId === "") {
        alert("Please enter Student ID.");
        return;
    }

    helpQueue.push(Number(studentId));

    actionHistory.push(
        "Student " + studentId + " added to Help Desk Queue"
    );

    displayQueue();
    updateDashboard();
    displayHistory();

    document.getElementById("queueStudentId").value = "";

    alert("Student added to queue!");
}


// Serve Student - FIFO
function serveStudent() {

    if (helpQueue.length === 0) {
        alert("Queue is empty.");
        return;
    }

    let servedStudent = helpQueue.shift();

    actionHistory.push(
        "Student " + servedStudent + " served from Queue"
    );

    displayQueue();
    updateDashboard();
    displayHistory();

    alert(
        "Student " + servedStudent +
        " has been served."
    );
}


// Display Queue
function displayQueue() {

    let list = document.getElementById("queueList");

    list.innerHTML = "";

    helpQueue.forEach(function(studentId) {

        let item = document.createElement("li");

        item.textContent =
            "Student ID: " + studentId;

        list.appendChild(item);
    });
}


// Display Action History - Stack
function displayHistory() {

    let list = document.getElementById("historyList");

    list.innerHTML = "";

    for (let i = actionHistory.length - 1; i >= 0; i--) {

        let item = document.createElement("li");

        item.textContent = actionHistory[i];

        list.appendChild(item);
    }
}


// Remove Last Action - Stack POP
function removeLastAction() {

    if (actionHistory.length === 0) {
        alert("No action history available.");
        return;
    }

    let removedAction = actionHistory.pop();

    displayHistory();

    updateDashboard();

    alert(
        "Last action removed:\n" +
        removedAction
    );
}


// Update Dashboard
function updateDashboard() {

    document.getElementById("studentCount").textContent =
        students.length;

    document.getElementById("courseCount").textContent =
        courses.length;

    document.getElementById("queueCount").textContent =
        helpQueue.length;

    if (actionHistory.length > 0) {

        document.getElementById("recentAction").textContent =
            actionHistory[actionHistory.length - 1];

    } else {

        document.getElementById("recentAction").textContent =
            "None";
    }
}


// Initial Page Setup
document.addEventListener("DOMContentLoaded", function() {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    document.getElementById("dashboard").style.display = "block";

    updateDashboard();

});
// Search Student
function searchStudent() {

    let id = Number(document.getElementById("searchId").value);

    let student = students.find(function(s) {
        return s.id === id;
    });

    if (student) {
        alert(
            "Student Found!\n\n" +
            "ID: " + student.id +
            "\nName: " + student.name +
            "\nBranch: " + student.branch +
            "\nSemester: " + student.semester +
            "\nCGPA: " + student.cgpa
        );
    } else {
        alert("Student not found.");
    }
}


// Update Student
function updateStudent() {

    let id = Number(document.getElementById("updateId").value);

    let student = students.find(function(s) {
        return s.id === id;
    });

    if (!student) {
        alert("Student not found.");
        return;
    }

    let newName = prompt("Enter new name:", student.name);
    let newBranch = prompt("Enter new branch:", student.branch);
    let newSemester = prompt("Enter new semester:", student.semester);
    let newCGPA = prompt("Enter new CGPA:", student.cgpa);

    if (newName !== null && newName !== "") {
        student.name = newName;
    }

    if (newBranch !== null && newBranch !== "") {
        student.branch = newBranch;
    }

    if (newSemester !== null && newSemester !== "") {
        student.semester = Number(newSemester);
    }

    if (newCGPA !== null && newCGPA !== "") {
        student.cgpa = Number(newCGPA);
    }

    actionHistory.push("Updated Student: " + student.name);

    displayStudents();
    displayHistory();
    updateDashboard();

    alert("Student updated successfully!");
}


// Delete Student
function deleteStudent() {

    let id = Number(document.getElementById("updateId").value);

    let index = students.findIndex(function(s) {
        return s.id === id;
    });

    if (index === -1) {
        alert("Student not found.");
        return;
    }

    let deletedName = students[index].name;

    students.splice(index, 1);

    actionHistory.push("Deleted Student: " + deletedName);

    displayStudents();
    displayHistory();
    updateDashboard();

    alert("Student deleted successfully!");
}


// Sort Students by CGPA
function sortStudents() {

    students.sort(function(a, b) {
        return b.cgpa - a.cgpa;
    });

    actionHistory.push("Students sorted by CGPA");

    displayStudents();
    displayHistory();
    updateDashboard();

    alert("Students sorted by CGPA!");
}
// ================= TREE =================

let treeRoot = null;

function createTreeNode(value) {
    return {
        value: value,
        left: null,
        right: null
    };
}

function insertTreeNode(root, value) {
    if (root === null) {
        return createTreeNode(value);
    }

    if (value < root.value) {
        root.left = insertTreeNode(root.left, value);
    } else if (value > root.value) {
        root.right = insertTreeNode(root.right, value);
    }

    return root;
}

function insertTree() {
    let value = Number(document.getElementById("treeValue").value);

    if (isNaN(value)) {
        alert("Please enter a value.");
        return;
    }

    treeRoot = insertTreeNode(treeRoot, value);

    document.getElementById("treeValue").value = "";

    displayTree();

    alert("Node inserted successfully!");
}

function inorder(root, result) {
    if (root !== null) {
        inorder(root.left, result);
        result.push(root.value);
        inorder(root.right, result);
    }
}

function displayTree() {
    let result = [];

    inorder(treeRoot, result);

    if (result.length === 0) {
        document.getElementById("treeOutput").innerHTML =
            "Tree is empty.";
    } else {
        document.getElementById("treeOutput").innerHTML =
            "<b>Inorder Traversal:</b> " + result.join(" → ");
    }
}

function searchTreeNode(root, value) {
    if (root === null) {
        return false;
    }

    if (root.value === value) {
        return true;
    }

    if (value < root.value) {
        return searchTreeNode(root.left, value);
    } else {
        return searchTreeNode(root.right, value);
    }
}

function searchTree() {
    let value = Number(document.getElementById("treeValue").value);

    if (isNaN(value)) {
        alert("Please enter a value.");
        return;
    }

    if (searchTreeNode(treeRoot, value)) {
        alert("Node " + value + " found in Tree!");
    } else {
        alert("Node " + value + " not found.");
    }
}
// ================= GRAPH =================

let graph = {};

function addEdge() {
    let node1 = document.getElementById("graphNode1").value.trim();
    let node2 = document.getElementById("graphNode2").value.trim();

    if (node1 === "" || node2 === "") {
        alert("Please enter both nodes.");
        return;
    }

    if (!graph[node1]) {
        graph[node1] = [];
    }

    if (!graph[node2]) {
        graph[node2] = [];
    }

    graph[node1].push(node2);
    graph[node2].push(node1);

    displayGraph();

    document.getElementById("graphNode1").value = "";
    document.getElementById("graphNode2").value = "";

    alert("Edge added successfully!");
}

function displayGraph() {
    let output = document.getElementById("graphOutput");

    if (Object.keys(graph).length === 0) {
        output.innerHTML = "Graph is empty.";
        return;
    }

    let result = "<b>Adjacency List:</b><br><br>";

    for (let node in graph) {
        result += node + " → " + graph[node].join(", ") + "<br>";
    }

    output.innerHTML = result;
}

function clearGraph() {
    graph = {};
    displayGraph();
    alert("Graph cleared!");
}