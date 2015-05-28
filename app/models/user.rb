class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :game_users
  has_many :games, through: :game_users
  has_many :friend_lists
  has_many :friends, through: :friend_lists, class_name: 'User', table_name: 'users'
  has_one :location
  has_many :group_users
  has_many :groups, through: :group_users


  accepts_nested_attributes_for :game_users
  accepts_nested_attributes_for :location


  scope :excluding, -> (user_id) {
    where.not(id: user_id)
  }

  class NullLocation
    def to_partial_path
      "/locations/location"
    end

    attr_reader :user_id, :formatted_address

    def lat
      34.51329900
    end

    def long
      -94.162880
    end

    def as_json(options={})
      { lat: lat, long: long, formatted_address: formatted_address }
    end

    def present?
      false
    end
    
    def blank?
      true
    end
  end

  def location
    super || NullLocation.new
  end

  def full_name
   "#{first_name} #{last_name}"
  end

  def as_json(options={})
    { id: id, email: email }
  end

  mount_uploader :avatar, AvatarUploader
end
