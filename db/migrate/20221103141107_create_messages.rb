class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :content
      t.integer :user_id
      # updates below for category id
      t.integer :category_id
      # t.datetime :created_at
      t.datetime :date
    end
  end
end
