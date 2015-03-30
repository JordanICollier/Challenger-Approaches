class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def full_name
   "#{first_name} #{last_name}"
  end

  def as_json(options={})
    { id: id, email: email }
  end

  mount_uploader :avatar, AvatarUploader
end
