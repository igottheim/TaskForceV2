class Message < ApplicationRecord

    belongs_to :user
    belongs_to :category
    validates :content, presence: true
    
end
