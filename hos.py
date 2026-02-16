# main.py

from hospital import doctor
from hospital import patient
from hospital import office


# Create Doctor Object
doc1 = doctor("Dr. Smith", "Cardiologist")
doc1.display_doctor()

print("------------------")

# Create Patient Object
pat1 = patient("Ravi", 25, "Heart Problem")
pat1.display_patient()

print("------------------")

# Create Office Object
off1 = office("City Hospital", "Hyderabad")
off1.display_office()