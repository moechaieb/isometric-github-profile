class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include ApplicationHelper

  def index
    @calendar = JSON.parse(params.fetch('calendar', []).to_s)
    @placeholder = params.fetch('github_username', 'Your GitHub username')
  end

  def new_calendar
    github_username = params.fetch('github_username')
    calendar = scrape_calendar(github_username)
    redirect_to root_path(calendar: calendar, github_username: github_username)
  end

  def about
    
  end
end
