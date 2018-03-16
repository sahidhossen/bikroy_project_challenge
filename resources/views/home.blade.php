@extends('layouts.dashboard')

@section('content')

    @if(Entrust::hasRole('admin'))
        <div id="admin"></div>
    @endif
    @if(Entrust::hasRole('employee'))
        <div id="employee"></div>
    @endif
@endsection
