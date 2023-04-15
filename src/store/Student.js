import { defineStore } from "pinia";

export const useStudent = defineStore('student_list', {
    state: () =>{
        return {
            student : []
        }
    },
    actions : {
        addStudentData(data) {
            console.log("pinia store add student data ");
            this.student.push(data);
        },
        getStudentData() {
            return this.student;
        }
    },
    persist: true,
});