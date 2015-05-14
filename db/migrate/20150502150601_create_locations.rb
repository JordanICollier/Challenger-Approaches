class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.decimal :lat,  {:precision=>10, :scale=>6}
      t.decimal :long, {:precision=>10, :scale=>6}
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
