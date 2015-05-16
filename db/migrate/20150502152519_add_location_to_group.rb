class AddLocationToGroup < ActiveRecord::Migration
  def change
    change_table :locations do |t|
      t.belongs_to :group
      t.string :formatted_address
    end
  end
end
