import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Set random seed for reproducibility
np.random.seed(42)

# Define sample data
clients = ["TechCorp", "HealthNet", "EduSystems", "FinanceFirst", "RetailPro"]
project_statuses = ["In-Progress", "Completed", "On-Hold"]
phases = ["Planning", "Development", "Testing", "Deployment"]
deliverables = ["Sprint: Strategy & Ops", "Site Updates", "Content Migration", "UI Development"]
milestones = ["Baseline", "Progress & Risk Management", "Site Updates"]
skill_levels = {
    "PM": ["PM - Tech 3", "PM - Tech 4", "PM - Tech 5"],
    "Designer": ["Designer 3", "Designer 4", "Designer 5"],
    "Developer": ["Developer 3", "Developer 4", "Developer 5"],
    "Content": ["Content Migration 5", "Content Migration 6", "Content Migration 7"]
}
skill_names = ["PM - Tech", "Designer", "Developer", "Content Migration"]
departments = ["Project Management", "Creative", "Technology", "Growth Architects"]
user_categories = ["Staff", "Contractor"]

# Generate employee data
employees = []
first_names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Sam", "Pat", "Drew"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]

for _ in range(20):
    employees.append({
        "FirstName": random.choice(first_names),
        "LastName": random.choice(last_names),
        "Department": random.choice(departments),
        "UserCategory": f"Primacy {random.choice(user_categories)}"
    })

# Generate fake data
rows = []
start_date = datetime(2025, 1, 1)
end_date = datetime(2025, 2, 28)
current_date = start_date

while current_date <= end_date:
    for _ in range(random.randint(3, 8)):  # Random number of entries per day
        client = random.choice(clients)
        project_name = f"{client} Site Maintenance 2025"
        employee = random.choice(employees)
        skill_type = random.choice(list(skill_levels.keys()))
        skill_level = random.choice(skill_levels[skill_type])
        skill_name = skill_type if skill_type == "PM" else random.choice(skill_names)
        
        # Generate realistic hours and costs
        estimate_hours = round(random.uniform(0.5, 12), 2)
        billing_rate = random.choice([125, 150, 175, 200])
        labor_rate = random.choice([80, 100, 125])
        tracked_hours = round(random.uniform(0.25, estimate_hours), 2)
        
        row = {
            "Client Name": client,
            "Project Name": project_name,
            "Project Status": random.choice(project_statuses),
            "Phase Name": random.choice(phases),
            "Deliverable Name": random.choice(deliverables),
            "Milestone Name": random.choice(milestones),
            "Skill Level Name": skill_level,
            "Skill Name": skill_name,
            "EstimateInHours": estimate_hours,
            "FeeEstimateHigh": estimate_hours * billing_rate,
            "TrackedTimeInHours": tracked_hours,
            "TrackedFee": tracked_hours * billing_rate,
            "TrackedLaborCost": tracked_hours * labor_rate,
            "BillingRate": billing_rate,
            "LaborRate": labor_rate,
            "Comment": f"Work on {random.choice(['updates', 'development', 'review', 'testing', 'documentation'])}",
            "TrackedDate": current_date.strftime("%-m/%-d/%y"),
            "FirstName": employee["FirstName"],
            "LastName": employee["LastName"],
            "DepartmentName": employee["Department"],
            "UserCategoryTag": employee["UserCategory"]
        }
        rows.append(row)
    
    current_date += timedelta(days=1)

# Create DataFrame and save to CSV
df = pd.DataFrame(rows)
df.to_csv("/Users/glebp/projects/ai-time-tracking-analysis/data_fake.csv", index=False)
