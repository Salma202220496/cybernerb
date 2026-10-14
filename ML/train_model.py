from sklearn.ensemble import RandomForestClassifier
import numpy as np
import joblib

# Features:
# [score, wrong_decisions, hints_used, completion_time]

X = np.array([
    [30, 4, 3, 290],
    [40, 3, 3, 270],
    [45, 3, 2, 250],
    [50, 2, 2, 230],

    [55, 2, 2, 210],
    [60, 2, 1, 200],
    [65, 1, 2, 190],
    [70, 1, 1, 180],
    [75, 1, 1, 160],

    [80, 1, 0, 150],
    [85, 0, 1, 140],
    [90, 0, 0, 120],
    [95, 0, 0, 100],
])

# Difficulty labels
y = np.array([
    "beginner",
    "beginner",
    "beginner",
    "beginner",

    "intermediate",
    "intermediate",
    "intermediate",
    "intermediate",
    "intermediate",

    "advanced",
    "advanced",
    "advanced",
    "advanced",
])

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "model.pkl")

print("CYBERNERB ML model trained successfully.")
print("model.pkl created.")