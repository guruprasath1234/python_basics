class Doctor:
    def __init__(self, name, specialization):
        self.name = name
        self.specialization = specialization
    def display_doctor(self):
        print("Doctor Name:", self.name)
        print("Specialization:", self.specialization)