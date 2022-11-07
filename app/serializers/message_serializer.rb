class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :category_id, :created_at

  belongs_to :user
  belongs_to :category

end
