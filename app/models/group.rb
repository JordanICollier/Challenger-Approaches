class Group < ActiveRecord::Base
  has_one :location
  belongs_to :host, foreign_key: :user_id
  has_many :group_users
  has_many :members, class_name: "User", table_name: 'users', through: :group_users, source: :user

  accepts_nested_attributes_for :location
end
