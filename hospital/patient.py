# patient.py

class Patient:
    def __init__(self, name, age, disease):
        self.name = name
        self.age = age
        self.disease = disease

    def display_patient(self):
        print("Patient Name:", self.name)
        print("Age:", self.age)
        print("Disease:", self.disease)