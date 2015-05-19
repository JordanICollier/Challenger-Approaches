class Group < ActiveRecord::Base
  belongs_to :location
  belongs_to :host, foreign_key: :user_id
  has_many :members, class_name: "User", table_name: 'users'

  accepts_nested_attributes_for :location
end
