Rails.application.routes.draw do
  root 'application#index'
  get  'about', to: 'application#about'
  post 'new', to: 'application#new'
end
