class RoomSerializer < ActiveModel::Serializer
  attributes :id, :category_id

  belongs_to :category
end
