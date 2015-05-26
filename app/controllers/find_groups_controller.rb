class FindGroupsController < ApplicationController
  def index
    @locations = Location.where('group_id is not null').pluck(:lat, :long, :group_id).map { |c|
      [c[0].to_s("F"), c[1].to_s("F"), c[2]]
    }
  end
end
