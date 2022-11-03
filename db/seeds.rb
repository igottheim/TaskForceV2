puts "seed starting!"


User.create(first_name: "Ian", last_name: "Gottheim", username: "iansruns", password: "ian", password_confirmation:"ian")
User.create(first_name: "Felicia", last_name: "Gottheim",username: "feliciaruns", password: "cool", password_confirmation:"cool")
User.create(first_name: "Parry", last_name: "Huang",username: "Parrycool", password: "bubbletea", password_confirmation:"bubbletea")
User.create(first_name: "Leon", last_name: "Wong",username: "Leon25", password: "codemaster", password_confirmation: "codemaster")


puts "seed complete"