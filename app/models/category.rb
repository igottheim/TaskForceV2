class Category < ApplicationRecord
    has_many :messages
    has_many :categories, through: :messages
end
