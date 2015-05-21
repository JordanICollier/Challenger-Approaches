class AddLocationToGroup < ActiveRecord::Migration
  def change
    change_table :locations do |t|
      t.string :formatted_address
      t.belongs_to :group
    end

  end
end
