class Location < ActiveRecord::Base
  belongs_to :users
  belongs_to :groups
end
