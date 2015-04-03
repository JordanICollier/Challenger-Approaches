class Game < ActiveRecord::Base
  has_many :game_users
  has_many :users, through: :game_users

  SMASH_GAMES = {
    "Smash Bros. 64" => "N64",
    "Smash Bros. Melee" => "Gamecube",
    "20XX" => "Gamecube",
    "Smash Bros. Brawl" => "Wii",
    "Project M" => "Wii",
    "Smash Bros. WiiU" => "WiiU",
    "Smash Bros. 3DS" => "Nintendo 3DS",
    "Smash Flash" => "Computer"
  }

  SMASH_GAME_NAMES = SMASH_GAMES.keys
  SMASH_PLATFORMS  = SMASH_GAMES.values.uniq

  validates :name, inclusion: { in: SMASH_GAME_NAMES }
  validates :platform, inclusion: { in: SMASH_PLATFORMS }
end
