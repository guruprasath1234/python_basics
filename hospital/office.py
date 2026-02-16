class Office:
    def __init__(self, hospital_name, location):
        self.hospital_name = hospital_name
        self.location = location
    def display_office(self):
        print("Hospital Name:", self.hospital_name)
        print("Location:", self.location)