class Message < ApplicationRecord

    belongs_to :user
    #updates below
    belongs_to :category
    validates :content, presence: true
    
end
