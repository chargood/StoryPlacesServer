/* *****************************************************************************
 *
 * StoryPlaces
 *

This application was developed as part of the Leverhulme Trust funded 
StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk

Copyright (c) 2016
  University of Southampton
    Charlie Hargood, cah07r.ecs.soton.ac.uk
    Kevin Puplett, k.e.puplett.soton.ac.uk
	David Pepper, d.pepper.soton.ac.uk

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * The name of the Universities of Southampton nor the name of its 
	  contributors may be used to endorse or promote products derived from 
	  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

***************************************************************************** */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User -----------------------------------------------------------------------

var User = new Schema({
    creationDate: Date
});

User.virtual('id').get(function () {
    return this._id.toHexString();
});

User.set('toJSON', {
    virtuals: true
});

// Card -----------------------------------------------------------------------

var Card = new Schema({
    content: String,
    label: String,
    footerButtonMode: String,
    conditions: [String],
    functions: [String],
    teaser: String,
    hint: {
        direction: String,
        location: [Schema.Types.Mixed],
    }
});

Card.virtual('id').get(function () {
    return this._id.toHexString();
});

Card.set('toJSON', {
    virtuals: true
});

// Story ----------------------------------------------------------------------

var Story = new Schema({
    name: String,
    deck: [Card],
    conditions: [Schema.Types.Mixed],
    functions: [Function],
    deckviewmode: String,
    description: String,
    author: String,
    cachedMediaIds: [Number],
	publishState: String,
	tags:[String],
	deckMapViewSettings:Schema.Types.Mixed
});

Story.virtual('id').get(function () {
    return this._id.toHexString();
});

Story.set('toJSON', {
    virtuals: true
});

// Variable -------------------------------------------------------------------

var Variable = new Schema({
    key: String,
    value: Schema.Types.Mixed
});

Variable.virtual('id').get(function () {
    return this._id.toHexString();
});

Variable.set('toJSON', {
    virtuals: true
});

// Reading --------------------------------------------------------------------

var Reading = new Schema({
    name: String,
    story: String,
    user: String,
    variables: [Variable]
});

Reading.virtual('id').get(function () {
    return this._id.toHexString();
});

Reading.set('toJSON', {
    virtuals: true
});

// LogEvent --------------------------------------------------------------------

var LogEvent = new Schema({
    user: String,
	date: Date,
    type: String,
	data: Schema.Types.Mixed
});

LogEvent.virtual('id').get(function () {
    return this._id.toHexString();
});

LogEvent.set('toJSON', {
    virtuals: true
});

// Function -------------------------------------------------------------------

var Function = new Schema({
    name: String,
    type: String,
    arguments: [String],
    conditions: [String]
});

Function.virtual('id').get(function () {
    return this._id.toHexString();
});

Function.set('toJSON', {
    virtuals: true
});

// Comparison Condition -------------------------------------------------------

var ComparissonCondition = new Schema({
    name: String,
    type: {type: String, default: "comparisson"},
    operand: String,
    a: String,
    aType: String,
    b: String,
    bType: String
});

ComparissonCondition.virtual('id').get(function () {
    return this._id.toHexString();
});

ComparissonCondition.set('toJSON', {
    virtuals: true
});

// Logical Condition ----------------------------------------------------------

var LogicalCondition = new Schema({
    name: String,
    type: {type: String, default: "logical"},
    operand: String,
    conditions: [String]
});

LogicalCondition.virtual('id').get(function () {
    return this._id.toHexString();
});

LogicalCondition.set('toJSON', {
    virtuals: true
});


// Location Condition ---------------------------------------------------------

var LocationCondition = new Schema({
    name: String,
    type: {type: String, default: "location"},
    bool: Boolean,
    locationType: String,
    locationData: Schema.Types.Mixed
});

LocationCondition.virtual('id').get(function () {
    return this._id.toHexString();
});

LocationCondition.set('toJSON', {
    virtuals: true
});

// Exports --------------------------------------------------------------------

module.exports = {
    User: mongoose.model('User', User),
    Card: mongoose.model('Card', Card),
    Story: mongoose.model('Story', Story),
    Variable: mongoose.model('Variable', Variable),
    Reading: mongoose.model('Reading', Reading),
	LogEvent: mongoose.model('LogEvent', LogEvent),
    Function: mongoose.model('Function', Function),
    ComparissonCondition: mongoose.model('ComparissonCondition', ComparissonCondition),
    LogicalCondition: mongoose.model('LogicalCondition', LogicalCondition),
    LocationCondition: mongoose.model('LocationCondition', LocationCondition)
};

