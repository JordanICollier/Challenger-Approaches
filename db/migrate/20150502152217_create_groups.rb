class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :title
      t.text :about
      t.integer :privacy
      t.belongs_to :user, index: true
      t.timestamps
    end
    add_foreign_key :groups, :users
  end
end
