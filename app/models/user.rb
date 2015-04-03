class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :game_users
  has_many :games, through: :game_users

  accepts_nested_attributes_for :game_users

  def full_name
   "#{first_name} #{last_name}"
  end

  def as_json(options={})
    { id: id, email: email }
  end

  mount_uploader :avatar, AvatarUploader
end
