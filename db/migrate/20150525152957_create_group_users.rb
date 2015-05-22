class CreateGroupUsers < ActiveRecord::Migration
  def change
    create_table :group_users do |t|
      t.integer :group_id, index: true
      t.integer :user_id, index: true
      t.timestamps
    end
  end
end
